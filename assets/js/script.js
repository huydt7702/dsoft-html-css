const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const MILLISECONDS_PER_SECOND = 1000;
const SCROLL_THRESHOLD = 600;
const ONE_THIRD = 33.33333;
const NEXT_PROGRESS = 'next';
const PREV_PROGRESS = 'prev';

const sidebarContainer = $('.js-sidebar');
const overlayContainer = $('.js-overlay');
const subHeaderContainer = $('.js-sub-header');
const progressContainer = $('.js-progress');

const bodyElement = $('body');
const feedbackVideo = $('.js-feedback-video');

const sidebarBarsButtons = $$('.js-sidebar-bars-btn');
const sidebarCloseBtn = $('.js-sidebar-close-btn');
const feedbackPlayVideoBtn = $('.js-feedback-play-video-btn');
const feedbackPauseVideoBtn = $('.js-feedback-pause-video-btn');
const prevProgressBtn = $('.js-prev-progress-btn');
const nextProgressBtn = $('.js-next-progress-btn');

function initApp() {
  function hiddenScrollBar() {
    bodyElement.style.overflow = 'hidden';
  }

  function showScrollBar() {
    bodyElement.style.overflow = 'unset';
  }

  function handleShowSidebar() {
    sidebarContainer.style.transform = 'translateX(0)';
    overlayContainer.style.display = 'block';
    hiddenScrollBar();
  }

  function handleCloseSidebar() {
    sidebarContainer.style.transform = 'translateX(100%)';
    overlayContainer.style.display = 'none';
    showScrollBar();
  }

  function handlePlayFeedbackVideo() {
    feedbackVideo.play();
    feedbackPlayVideoBtn.style.display = 'none';
    feedbackPauseVideoBtn.style.display = 'flex';

    setTimeout(() => {
      feedbackPauseVideoBtn.style.display = 'none';
    }, MILLISECONDS_PER_SECOND);
  }

  function handlePauseFeedbackVideo() {
    feedbackVideo.pause();
    feedbackPlayVideoBtn.style.display = 'flex';
    feedbackPauseVideoBtn.style.display = 'none';
  }

  function handleToggleFeedbackVideo() {
    if (feedbackVideo.paused) {
      handlePlayFeedbackVideo();
    } else {
      handlePauseFeedbackVideo();
    }
  }

  function handleShowSubHeader() {
    if (window.scrollY >= SCROLL_THRESHOLD) {
      subHeaderContainer.style.top = '0';
    } else {
      subHeaderContainer.style.top = '-100%';
    }
  }

  function handleProgress(direction) {
    let currentWidth = +progressContainer.style.width.replace('%', '');
    if (direction === NEXT_PROGRESS) {
      if (currentWidth > 99) return;
      currentWidth += ONE_THIRD;
    } else if (direction === PREV_PROGRESS) {
      currentWidth -= ONE_THIRD;
    }
    progressContainer.style.width = currentWidth + '%';
  }

  // Listen DOM Events
  sidebarBarsButtons.forEach((sidebarBarsButton) => {
    sidebarBarsButton.addEventListener('click', handleShowSidebar);
  });
  sidebarCloseBtn.addEventListener('click', handleCloseSidebar);
  overlayContainer.addEventListener('click', handleCloseSidebar);

  feedbackPlayVideoBtn.addEventListener('click', handlePlayFeedbackVideo);
  feedbackPauseVideoBtn.addEventListener('click', handlePauseFeedbackVideo);

  nextProgressBtn.addEventListener('click', () => handleProgress(NEXT_PROGRESS));
  prevProgressBtn.addEventListener('click', () => handleProgress(PREV_PROGRESS));

  feedbackVideo.addEventListener('click', handleToggleFeedbackVideo);
  window.addEventListener('scroll', handleShowSubHeader);
}

initApp();
