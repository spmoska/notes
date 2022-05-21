$(document).ready(function() {
    let modeButtons = document.getElementsByClassName('mode');
let text = document.getElementById('note__text');
let modeClass = '';
let selRange = null;

[...modeButtons].forEach(b => {
  b.addEventListener('click', e => {
    e.target.classList.toggle('active');
    modeClass = ([...modeButtons].map(b => b.classList.contains('active') ? b.getAttribute('data-font') : '')).join(' ');
    if(selRange){
      if(selRange.commonAncestorContainer == text){
        let spans = [...text.getElementsByTagName('span')];
        let start = spans.indexOf(selRange.startContainer.parentElement);
        let end = spans.indexOf(selRange.endContainer.parentElement);
        for(let i = start; i <= end; i++){
          if(b.classList.contains('active')){
            spans[i].classList.add(b.getAttribute('data-font'));
          } else {
            spans[i].classList.remove(b.getAttribute('data-font'));
          }
        }
      }
    }
  })

})

text.onkeypress = e => {
  if(/[a-zA-Z0-9,.А-ЯЁа-яё]/u.test(e.key.toString()) && e.key != 'Enter'){
    e.preventDefault();

    let span = document.createElement('span');
    span.textContent = e.key;
    span.className = modeClass;
    e.target.append(span);
  
    let sel = window.getSelection();
    sel.collapse(span, 1);
  }
}

text.onmouseup = e => {
  let sel = window.getSelection();
  if(sel.type == 'Range'){
selRange = sel.getRangeAt(0);
[...modeButtons].forEach(b => {b.classList.remove('active')});
modeClass = '';
  } else {
selRange = null;
  }
}
})