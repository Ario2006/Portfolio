const blurCircle = document.getElementById('blur-circle');
    const card = document.querySelector('.heroimg');
    const img = card.querySelector('img');
    const cards = document.querySelectorAll('.service-card');
    const container = document.querySelector('.sc-container');
    let prevX = 0;
    let prevY = 0;

    document.addEventListener('mousemove', (e) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      const deltaX = currentX - prevX;
      const deltaY = currentY - prevY;
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const scaleX = 1 + Math.min(speed / 100, 0.3);
      const scaleY = 1 - Math.min(speed / 300, 0.1);
      const skewX = Math.min(deltaX / 100, 10);

      blurCircle.style.left = `${currentX}px`;
      blurCircle.style.top = `${currentY}px`;
      blurCircle.style.transform = `translate(-50%, -50%) scale(${scaleX}, ${scaleY}) skewX(${skewX}deg)`;

      prevX = currentX;
      prevY = currentY;
    });
    
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;

      const centerX = cardRect.left + cardWidth / 2;
      const centerY = cardRect.top + cardHeight / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const rotateX = (deltaY / cardHeight) * 15;
      const rotateY = (deltaX / cardWidth) * -15;

      img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      img.style.transform = 'rotateX(0) rotateY(0)';
    });

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2; 
        const cardY = rect.top + rect.height / 2; 
        const offsetX = (e.clientX - cardX) / 15; 
        const offsetY = (e.clientY - cardY) / 15; 

        card.style.transform = `rotateY(${offsetX}deg) rotateX(${-offsetY}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0) rotateX(0)';
      });
    });