/* Static website: GitHub Pages compatible; no backend or dependencies. */
(async function(){
 const slides=await fetch('slides.json').then(r=>{if(!r.ok)throw Error('slides.json load failed');return r.json()});
 const $=id=>document.getElementById(id),list=$('slideList'),layers=$('slideLayers'),quick=$('quickGrid'),menu=$('slideMenu');
 let index=0,lockedUntil=0,touchStart=null;
 const fmt=n=>String(n).padStart(2,'0');
 const safeIndex=n=>Math.max(0,Math.min(slides.length-1,n));
 slides.forEach((s,i)=>{
  const img=document.createElement('img');img.src=s.image;img.alt=s.title+' — '+s.subtitle+' — '+s.details;img.className='slide-layer';img.loading=i<2?'eager':'lazy';img.decoding='async';layers.appendChild(img);
  const item=document.createElement('button');item.type='button';item.className='slide-item';item.innerHTML='<span class="number">'+fmt(i+1)+'</span><span class="item-label"></span>';item.querySelector('.item-label').textContent=s.title;item.onclick=()=>go(i,true);list.appendChild(item);
  const card=document.createElement('button');card.type='button';card.className='quick-card';card.innerHTML='<img loading="lazy" alt="" src="'+s.thumb+'"><span><em>'+fmt(i+1)+'</em></span>';card.querySelector('span').append(document.createTextNode(s.title));card.onclick=()=>{go(i,true);window.scrollTo({top:0,behavior:'smooth'})};quick.appendChild(card);
 });
 const images=[...layers.children],items=[...list.children],cards=[...quick.children];
 function go(n,push=false){const next=safeIndex(n);const changed=next!==index;index=next;const s=slides[index];
  images.forEach((im,i)=>{im.classList.toggle('current',i===index);im.setAttribute('aria-hidden',i!==index?'true':'false')});
  items.forEach((it,i)=>{it.classList.toggle('active',i===index);it.setAttribute('aria-current',i===index?'step':'false')});
  cards.forEach((it,i)=>it.classList.toggle('active',i===index));
  $('counter').textContent=fmt(index+1)+' / '+fmt(slides.length);$('pageText').innerHTML=fmt(index+1)+' <span>/ '+fmt(slides.length)+'</span>';
  $('sectionLabel').textContent=s.title;$('sectionSub').textContent=s.subtitle;$('slideBadge').textContent=fmt(index+1)+' — '+s.tag;
  $('progressFill').style.width=((index+1)/slides.length*100)+'%';document.querySelector('.progress').setAttribute('aria-valuenow',index+1);
  $('prevButton').disabled=index===0;$('nextButton').disabled=index===slides.length-1;
  $('srAnnounce').textContent='슬라이드 '+(index+1)+' / '+slides.length+': '+s.title+'. '+s.subtitle;
  if(changed&&push)history.replaceState(null,'','#slide-'+(index+1));
  if(window.innerWidth<851)menu.classList.remove('open');$('menuButton').setAttribute('aria-expanded','false');
  if(items[index])items[index].scrollIntoView({block:'nearest',behavior:'smooth'});
  const nearby=[index-1,index+1];nearby.filter(i=>i>=0&&i<slides.length).forEach(i=>{images[i].loading='eager'});
 }
 $('prevButton').onclick=()=>go(index-1,true);$('nextButton').onclick=()=>go(index+1,true);
 document.querySelectorAll('[data-step]').forEach(el=>el.onclick=()=>go(index+Number(el.dataset.step),true));
 $('menuButton').onclick=()=>{let opened=menu.classList.toggle('open');$('menuButton').setAttribute('aria-expanded',String(opened))};
 $('fullscreenButton').onclick=()=>{if(!document.fullscreenElement){$('stageOuter').requestFullscreen?.()}else{document.exitFullscreen?.()}};
 $('zoomButton').onclick=()=>{const z=$('stageOuter').classList.toggle('zoomed');$('zoomButton').setAttribute('aria-label',z?'원래 크기 보기':'확대 보기');$('zoomButton').title=z?'원래 크기':'모바일 확대 보기'};
 document.addEventListener('keydown',e=>{const tag=document.activeElement?.tagName;if(['INPUT','TEXTAREA','SELECT'].includes(tag))return;
  if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();go(index+1,true)}
  else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(index-1,true)}
  else if(e.key==='Home'){e.preventDefault();go(0,true)}else if(e.key==='End'){e.preventDefault();go(slides.length-1,true)}
  else if(e.key==='Escape'){menu.classList.remove('open');$('menuButton').setAttribute('aria-expanded','false')}
 });
 $('stage').addEventListener('touchstart',e=>{touchStart={x:e.changedTouches[0].screenX,y:e.changedTouches[0].screenY}},{passive:true});
 $('stage').addEventListener('touchend',e=>{if(!touchStart||$('stageOuter').classList.contains('zoomed'))return;let dx=e.changedTouches[0].screenX-touchStart.x,dy=e.changedTouches[0].screenY-touchStart.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.25)go(index+(dx<0?1:-1),true);touchStart=null},{passive:true});
 $('stage').addEventListener('wheel',e=>{if(e.ctrlKey||$('stageOuter').classList.contains('zoomed'))return;if(Math.abs(e.deltaY)<12)return;const now=Date.now();if(now<lockedUntil)return;lockedUntil=now+850;go(index+(e.deltaY>0?1:-1),true)},{passive:true});
 window.addEventListener('hashchange',()=>{const match=location.hash.match(/^#slide-(\d+)$/);if(match)go(Number(match[1])-1)});
 const match=location.hash.match(/^#slide-(\d+)$/);go(match?Number(match[1])-1:0);
})().catch(err=>{console.error(err);document.querySelector('.section-label').textContent='슬라이드를 불러오지 못했습니다. 정적 웹 서버에서 실행해 주세요.'});