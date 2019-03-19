const buttonStyle = {
  display: 'none',
  position: 'absolute',
  top: '0',
  right: 0,
  width: '60px',
  height: '30px',
  color: '#000',
  background: '#fff',
  opacity: 0.6,
  'border-radius': '6px',
  'line-height': '30px',
  'text-align': 'center',
  'font-size': '14px',
  cursor: 'pointer',
  'z-index': 10000,
};

function init() {
  let nodes = [].slice.call(document.querySelectorAll('video'), 0);
  nodes.forEach(installPipButton);
}

function installPipButton(video) {
  const parent = getBilibiliLiveContainer() || video.parentNode;
  const button = createPipButton(video);
  parent.appendChild(button);
  parent.addEventListener('mouseenter', () => show(button));
  parent.addEventListener('mouseleave', () => hide(button));
}

function createPipButton(video) {
  const div = document.createElement('div');
  div.innerHTML = 
    `<button
      class="pip_button"
      style="${genStyleString(buttonStyle)}"
    >
      pip
    </button>`
  ;
  const button = div.childNodes[0];
  button.addEventListener('click', () => {
    disable(button);
    enabelPip(video)
      .then(() => enable(button));
  });
  return button;
}

function getBilibiliLiveContainer() {
  const cl = '.live-player-mounter';
  return document.querySelectorAll(cl)[0];
}

function enabelPip(video) {
  return video.requestPictureInPicture();
}

function show(ele) {
  ele.style.display = 'block';
}

function hide(ele) {
  ele.style.display = 'none';
}

function disable(ele) {
  ele.disabled = true;
}

function enable(ele) {
  ele.disabled = false;
}

function genStyleString(obj) {
  return Object
    .keys(obj)
    .map(key => `${key}:${obj[key]}`)
    .join(';');
}

function ready() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  })
}

ready()
  .then(init);