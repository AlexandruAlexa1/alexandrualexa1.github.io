let currentSlide = 0;
let autoSlideInterval;
const slider = document.getElementById("slider");
const cardContainer = document.getElementById("card-container");
const cards = [];
const slides = [];

function loadProjects() {
    projects.forEach((project, index) => {
        const slide = document.createElement("div");
        slide.classList.add("slide");

        const thumbnailsHtml = project.thumbnails.map((thumbnail, thumbIndex) =>
            `<img src="${thumbnail}" alt="Thumbnail" class="thumbnail" data-project-index="${index}" data-thumb-index="${thumbIndex}">`
        ).join('');

        slide.innerHTML = `
            <img class="main-image" src="${project.mainImage}" alt="${project.title}">
            <div class="project-details">
                <h3>${project.title}</h3>
               
                <p><strong>Technologies:</strong> ${project.technologies}</p>
                <a href="${project.link}" target="blank">View details</a>
            </div>
            <div class="project-thumbnails">
                ${thumbnailsHtml}
            </div>
        `;

        slides.push(slide);
        slider.appendChild(slide);

        if (index < 5) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `<img src="${project.mainImage}" alt="${project.title}">`;
            cardContainer.appendChild(card);
            cards.push(card);

            card.addEventListener("click", () => {
                currentSlide = index;
                updateSliderPosition();
                updateCardSelection();
            });
        }

        const largeCardContainer = document.querySelector('.responsive-projects');
        const largeCard = createLargeCard(project);
        largeCardContainer.appendChild(largeCard);
    });

    updateCardSelection();
    addThumbnailEventListeners();
}

function createLargeCard(project) {
    const largeCard = document.createElement('div');
    largeCard.classList.add('large-card');

    largeCard.innerHTML = `
        <ul class="projects-list">
            <li>
                <h3>${project.title}</h3>
                <a href="${project.link}">View details</a>
            </li>
        </ul>
    `

    return largeCard;
}


function addThumbnailEventListeners() {
    document.querySelectorAll('.thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', (event) => {
            const projectIndex = parseInt(event.target.getAttribute('data-project-index'));
            const thumbIndex = parseInt(event.target.getAttribute('data-thumb-index'));
            const project = projects[projectIndex];
            const newMainImage = project.thumbnails[thumbIndex];
            slides[projectIndex].querySelector('.main-image').src = newMainImage;
        });
    });
}

function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    if (currentSlide % 5 === 0) {
        updateCardList();
    }
    updateCardSelection();
}

function updateCardList() {
    const startIndex = Math.floor(currentSlide / 5) * 5;
    cardContainer.querySelectorAll(".card").forEach((card, index) => {
        const projectIndex = startIndex + index;
        if (projects[projectIndex]) {
            card.querySelector("img").src = projects[projectIndex].mainImage;
        }
    });
}

function updateCardSelection() {
    cards.forEach((card, index) => {
        card.classList.toggle("active", index === (currentSlide % 5));
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % projects.length;
    updateSliderPosition();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + projects.length) % projects.length;
    updateSliderPosition();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

document.addEventListener("DOMContentLoaded", () => {
    loadProjects();
    // startAutoSlide();

    const sliderContainer = document.querySelector(".slider-container");
    sliderContainer.addEventListener("mouseover", stopAutoSlide);
    sliderContainer.addEventListener("mouseout", startAutoSlide);
});
