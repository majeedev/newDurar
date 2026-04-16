
let currentCard = 0;
const cards = document.querySelectorAll('.cardi');

function showCard(index) {
  cards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
}

function nextCard() {
  currentCard = (currentCard + 1) % cards.length;
  showCard(currentCard);
}

function prevCard() {
  currentCard = (currentCard - 1 + cards.length) % cards.length;
  showCard(currentCard);
}

//  <!-- ---------- حركة الكروت ---------- -->

    window.addEventListener("scroll", () => {
      document.querySelectorAll(".card").forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setTimeout(() => {
            card.classList.add("visible");
          }, i * 200);
        }
      });
    });

 // <!-- ---القسم الخاص بالجزء الثالث    المميزات ----properties -->

  const elements = document.querySelectorAll('.sub-properties');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));


// <!-- -------------------------------حركة المواقع القسم الرابع -->
const container = document.querySelector('.photo-contener');
const photos = Array.from(document.querySelectorAll('.photo-site'));


photos.forEach(photo => {
  const clone = photo.cloneNode(true);
  container.appendChild(clone);
});

let index = 0;
const photoWidth = photos[0].offsetWidth + 20; 

function moveCarousel() {
  index++;
  container.style.transition = 'transform 0.5s ease-in-out';
  container.style.transform = `translateX(-${index * photoWidth}px)`;


  if (index >= photos.length) {
    setTimeout(() => {
      container.style.transition = 'none';
      container.style.transform = 'translateX(0)';
      index = 0;
    }, 500);
  }
}

setInterval(moveCarousel, 2000);

{
/* <!-- ------------------------------------------القسم الخامس  ب ctrl+r  --> */}

  window.addEventListener("load", function() {
    
    if (window.location.hash) {
      window.scrollTo(0, 0);
      history.replaceState(null, null, window.location.pathname);
    }
  });
{
 
/*<!-- -----------------------------------------القسم الخاص بالnavlink الخاص hamburger --> */}

const hamburger = document.getElementById('Hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
const navLinksItems = document.querySelectorAll('.nav-links a');

navLinksItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active'); 

   
    const targetId = link.getAttribute('href');
    if(targetId.startsWith('#')) {
      const targetElement = document.querySelector(targetId);
      if(targetElement){
        targetElement.scrollIntoView({ behavior: 'smooth' }); 
      }
    }
  });
});
