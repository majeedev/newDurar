document.addEventListener('DOMContentLoaded', () => {
    // 0. Preloader Removal
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            document.body.classList.remove('loading');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    });

    // 1. Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple animation for the menu icon if needed
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 3. Hero Store Selector
    const heroGoBtn = document.getElementById('hero-go-btn');
    const heroStoreSelect = document.getElementById('hero-store-select');

    heroGoBtn.addEventListener('click', () => {
        const url = heroStoreSelect.value;
        if (url) {
            window.open(url, '_blank');
        } else {
            alert('يرجى اختيار متجر أولاً للمواصلة ✅');
        }
    });

    // 4. FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 5. Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto Advance Testimonials
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);

    // 6. Order Form Submission (WhatsApp)
    const requestForm = document.getElementById('request-form');
    const submitBtn = document.getElementById('submit-btn');

    requestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'جاري التحويل...';
        submitBtn.disabled = true;

        const productLink = document.getElementById('product-link').value;
        const details = document.getElementById('product-details').value;
        const qty = document.getElementById('quantity').value;
        const name = document.getElementById('customer-name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        const message = `*طلب جديد من شي إن دُرَر*%0A%0A` +
                        `*رابط المنتج:* ${productLink}%0A` +
                        `*التفاصيل:* ${details}%0A` +
                        `*الكمية:* ${qty}%0A%0A` +
                        `*اسم العميل:* ${name}%0A` +
                        `*رقم الهاتف:* ${phone}%0A` +
                        `*العنوان:* ${address}%0A%0A` +
                        `آمل الرد بتأكيد السعر النهائي.`;

        const whatsappUrl = `https://wa.me/967781555105?text=${message}`;
        
        // Timeout to simulate processing before redirect
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
            
            // Reset form
            requestForm.reset();
            alert('تم تجهيز طلبك! سيتم نقلك الآن إلى واتساب لإتمام الطلب.');
        }, 1000);
    });

    // 7. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .step-item, .order-container, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Custom CSS for animations added via JS
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
