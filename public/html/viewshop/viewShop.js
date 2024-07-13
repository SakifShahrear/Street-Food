
///Available Food SEction Start  --->>>

document.addEventListener('DOMContentLoaded', () => {
    const foodData = [
        // Sample food items data
        {
            img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NjI0M3wwfDF8c2VhcmNofDl8fGZvb2R8ZW58MHx8fHwxNzIwNzE1NDIyfDA&ixlib=rb-4.0.3&q=80&w=1080',
            title: 'Nostalgic waves',
            rating: 5,
            description: 'Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate.',
            date: '2 days ago'
        },
        {
            img: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NjI0M3wwfDF8c2VhcmNofDN8fGZvb2R8ZW58MHx8fHwxNzIwNzE1Mzg0fDA&ixlib=rb-4.0.3&q=80&w=1080',
            title: 'Tasty Delights',
            rating: 4,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            date: '3 days ago'
        },
        {
            img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NjI0M3wwfDF8c2VhcmNofDl8fGZvb2R8ZW58MHx8fHwxNzIwNzE1NDIyfDA&ixlib=rb-4.0.3&q=80&w=1080',
            title: 'Nostalgic waves',
            rating: 5,
            description: 'Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate.',
            date: '2 days ago'
        },
        {
            img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NjI0M3wwfDF8c2VhcmNofDl8fGZvb2R8ZW58MHx8fHwxNzIwNzE1NDIyfDA&ixlib=rb-4.0.3&q=80&w=1080',
            title: 'Nostalgic waves',
            rating: 5,
            description: 'Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate.',
            date: '2 days ago'
        },
        {
            img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NjI0M3wwfDF8c2VhcmNofDl8fGZvb2R8ZW58MHx8fHwxNzIwNzE1NDIyfDA&ixlib=rb-4.0.3&q=80&w=1080',
            title: 'Nostalgic waves',
            rating: 5,
            description: 'Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate.',
            date: '2 days ago'
        },
        // Add more food items if needed...
    ];

    const itemsPerPage = 3;
    let currentPage = 1;
    const totalPages = Math.ceil(foodData.length / itemsPerPage);

    const foodCardsContainer = document.getElementById('food-cards');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageNumbers = document.getElementById('page-numbers');

    function renderFoodItems() {
        foodCardsContainer.innerHTML = '';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const itemsToRender = foodData.slice(start, end);

        itemsToRender.forEach(item => {
            const foodCard = document.createElement('div');
            foodCard.classList.add('col-lg-4', 'col-md-12', 'mb-4', 'mb-lg-0');
            foodCard.innerHTML = `
                <div class="card card-custom">
                    <div class="bg-image hover-overlay ripple ripple-surface-light" data-ripple-color="light">
                        <img src="${item.img}" class="img-fluid" alt="" loading="lazy">
                        <svg class="position-absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
                            style="left: 0; bottom: 0">
                            <path fill="#fff" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                        </svg>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <section class="p-4 d-flex justify-content-center text-center w-100">
                            <ul class="rating">
                                ${'<li><i class="fa-star fa-sm far" style="color: rgb(103, 58, 183);"></i></li>'.repeat(item.rating)}
                            </ul>
                        </section>
                        <p class="card-text">${item.description}</p>
                        <a href="#!" class="btn btn-primary">Details</a>
                    </div>
                    <div class="card-footer">${item.date}</div>
                </div>
            `;
            foodCardsContainer.appendChild(foodCard);
        });
    }

    function renderPaginationControls() {
        pageNumbers.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageNumber = document.createElement('span');
            pageNumber.textContent = i;
            pageNumber.classList.add('btn', 'btn-outline-primary');
            if (i === currentPage) {
                pageNumber.classList.add('active');
            }
            pageNumber.addEventListener('click', () => {
                currentPage = i;
                updatePagination();
            });
            pageNumbers.appendChild(pageNumber);
        }
    }

    function updatePagination() {
        renderFoodItems();
        renderPaginationControls();
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });

    // Initial render
    updatePagination();
});




///Available Review SEction --->>>

document.addEventListener('DOMContentLoaded', () => {
    const testimonialData = [
        {
            message: 'Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim elementum. Donec a ullamcorper diam.',
            name: 'John Doe',
            position: 'Web Developer'
        },
        {
            message: 'Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim elementum. Donec a ullamcorper diam.',
            name: 'John Doe',
            position: 'Web Developer'
        },
        {
            message: 'Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim elementum. Donec a ullamcorper diam.',
            name: 'John Doe',
            position: 'Web Developer'
        },
        {
            message: 'Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim elementum. Donec a ullamcorper diam.',
            name: 'John Doe',
            position: 'Web Developer'
        },
        {
            message: 'Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim elementum. Donec a ullamcorper diam.',
            name: 'John Doe',
            position: 'Web Developer'
        },
       
        // Add more testimonials if needed...
    ];

    

    const testimonialItemsPerPage = 3;
    let testimonialCurrentPage = 1;
    const testimonialTotalPages = Math.ceil(testimonialData.length / testimonialItemsPerPage);

    const testimonialCardsContainer = document.getElementById('testimonial-cards');
    const testimonialPrevBtn = document.getElementById('testimonial-prev-btn');
    const testimonialNextBtn = document.getElementById('testimonial-next-btn');
    const testimonialPageNumbers = document.getElementById('testimonial-page-numbers');

    function renderTestimonials() {
        testimonialCardsContainer.innerHTML = '';
        const start = (testimonialCurrentPage - 1) * testimonialItemsPerPage;
        const end = start + testimonialItemsPerPage;
        const itemsToRender = testimonialData.slice(start, end);

        itemsToRender.forEach(item => {
            const testimonialCard = document.createElement('div');
            testimonialCard.classList.add('col-md-4', 'mb-4', 'mb-md-0');
            testimonialCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <div class="mb-4">
                            <svg class="me-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                <path fill="currentColor" d="M10.5 7C10.5 7.78 10.22 8.53 9.72 9.11C9.36 9.54 8.88 9.85 8.34 10.03C7.91 10.18 7.5 10.5 7.29 10.93L6.6 12.53C6.27 13.3 5.44 13.75 4.58 13.58C3.7 13.4 3.17 12.42 3.58 11.59L4.27 10C4.79 8.87 5.62 7.91 6.68 7.2C7.66 6.56 8.81 6.15 10 6.02C10.27 6 10.5 6.22 10.5 6.5V7M22 7V6.5C22 6.22 21.78 6 21.5 6C20.3 6.15 19.15 6.56 18.18 7.2C17.11 7.91 16.29 8.87 15.76 10L15.07 11.59C14.66 12.42 15.2 13.4 16.07 13.58C16.93 13.75 17.77 13.3 18.1 12.53L18.79 10.93C19 10.5 19.41 10.18 19.84 10.03C20.38 9.85 20.86 9.54 21.22 9.11C21.72 8.53 22 7.78 22 7M1 21V19H23V21H1Z"></path>
                            </svg>
                        </div>
                        <p class="mb-4">${item.message}</p>
                        <h5 class="mb-2">${item.name}</h5>
                        <p class="text-muted">${item.position}</p>
                    </div>
                </div>
            `;
            testimonialCardsContainer.appendChild(testimonialCard);
        });
    }

    function renderPaginationControls() {
        testimonialPageNumbers.innerHTML = '';
        for (let i = 1; i <= testimonialTotalPages; i++) {
            const pageNumber = document.createElement('span');
            pageNumber.textContent = i;
            pageNumber.classList.add('btn', 'btn-outline-primary');
            if (i === testimonialCurrentPage) {
                pageNumber.classList.add('active');
            }
            pageNumber.addEventListener('click', () => {
                testimonialCurrentPage = i;
                updatePagination();
            });
            testimonialPageNumbers.appendChild(pageNumber);
        }
    }

    function updatePagination() {
        renderTestimonials();
        renderPaginationControls();
        testimonialPrevBtn.disabled = testimonialCurrentPage === 1;
        testimonialNextBtn.disabled = testimonialCurrentPage === testimonialTotalPages;
    }

    testimonialPrevBtn.addEventListener('click', () => {
        if (testimonialCurrentPage > 1) {
            testimonialCurrentPage--;
            updatePagination();
        }
    });

    testimonialNextBtn.addEventListener('click', () => {
        if (testimonialCurrentPage < testimonialTotalPages) {
            testimonialCurrentPage++;
            updatePagination();
        }
    });

    // Initial render
    updatePagination();
});



///Available video SEction start--->>>
document.addEventListener('DOMContentLoaded', () => {
    const videoData = [
        {
            title: 'gfdgf Wave',
            description: 'Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim elementum. Donec a ullamcorper diam.',
            imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NjI0M3wwfDF8c2VhcmNofDN8fGZvb2R8ZW58MHx8fHwxNzIwNzE1Mzg0fDA&ixlib=rb-4.0.3&q=80&w=1080'
        },
        {
            title: 'fdj Wave',
            description: 'Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim elementum. Donec a ullamcorper diam.',
            imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NjI0M3wwfDF8c2VhcmNofDN8fGZvb2R8ZW58MHx8fHwxNzIwNzE1Mzg0fDA&ixlib=rb-4.0.3&q=80&w=1080'
        },
        {
            title: 'Beach fdg',
            description: 'Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim elementum. Donec a ullamcorper diam.',
            imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NjI0M3wwfDF8c2VhcmNofDN8fGZvb2R8ZW58MHx8fHwxNzIwNzE1Mzg0fDA&ixlib=rb-4.0.3&q=80&w=1080'
        },
        {
            title: 'hgfd Wave',
            description: 'Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim elementum. Donec a ullamcorper diam.',
            imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NjI0M3wwfDF8c2VhcmNofDN8fGZvb2R8ZW58MHx8fHwxNzIwNzE1Mzg0fDA&ixlib=rb-4.0.3&q=80&w=1080'
        },
        {
            title: 'Beach ',
            description: 'Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim elementum. Donec a ullamcorper diam.',
            imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NjI0M3wwfDF8c2VhcmNofDN8fGZvb2R8ZW58MHx8fHwxNzIwNzE1Mzg0fDA&ixlib=rb-4.0.3&q=80&w=1080'
        },
        {
            title: ' Wave',
            description: 'Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim elementum. Donec a ullamcorper diam.',
            imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NjI0M3wwfDF8c2VhcmNofDN8fGZvb2R8ZW58MHx8fHwxNzIwNzE1Mzg0fDA&ixlib=rb-4.0.3&q=80&w=1080'
        },
        {
            title: 'Beach ',
            description: 'Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim elementum. Donec a ullamcorper diam.',
            imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NjI0M3wwfDF8c2VhcmNofDN8fGZvb2R8ZW58MHx8fHwxNzIwNzE1Mzg0fDA&ixlib=rb-4.0.3&q=80&w=1080'
        },
        // Add more video data as needed...
    ];

    const videoItemsPerPage = 3;
    let videoCurrentPage = 1;
    const videoTotalPages = Math.ceil(videoData.length / videoItemsPerPage);

    const videoCardsContainer = document.getElementById('video-cards');
    const videoPrevBtn = document.getElementById('video-prev-btn');
    const videoNextBtn = document.getElementById('video-next-btn');
    const videoPageNumbers = document.getElementById('video-page-numbers');

    function renderVideos() {
        videoCardsContainer.innerHTML = '';
        const start = (videoCurrentPage - 1) * videoItemsPerPage;
        const end = start + videoItemsPerPage;
        const itemsToRender = videoData.slice(start, end);

        itemsToRender.forEach(item => {
            const videoCard = document.createElement('div');
            videoCard.classList.add('col-md-4', 'mb-4', 'mb-md-0');
            videoCard.innerHTML = `
                <div class="card">
                    <div class="bg-image hover-overlay ripple ripple-surface-light" data-mdb-ripple-color="light"
                        style="background-image: url('${item.imageUrl}'); height: 250px;">
                        <div class="mask" style="background-color: rgba(251, 251, 251, 0.15); height: 250px;"></div>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.description}</p>
                        <a href="#!" class="btn btn-primary" style="min-width: auto;">Button</a>
                    </div>
                </div>
            `;
            videoCardsContainer.appendChild(videoCard);
        });
    }

    function renderPaginationControls() {
        videoPageNumbers.innerHTML = '';
        for (let i = 1; i <= videoTotalPages; i++) {
            const pageNumber = document.createElement('span');
            pageNumber.textContent = i;
            pageNumber.classList.add('btn', 'btn-outline-primary');
            if (i === videoCurrentPage) {
                pageNumber.classList.add('active');
            }
            pageNumber.addEventListener('click', () => {
                videoCurrentPage = i;
                updatePagination();
            });
            videoPageNumbers.appendChild(pageNumber);
        }
    }

    function updatePagination() {
        renderVideos();
        renderPaginationControls();
        videoPrevBtn.disabled = videoCurrentPage === 1;
        videoNextBtn.disabled = videoCurrentPage === videoTotalPages;
    }

    videoPrevBtn.addEventListener('click', () => {
        if (videoCurrentPage > 1) {
            videoCurrentPage--;
            updatePagination();
        }
    });

    videoNextBtn.addEventListener('click', () => {
        if (videoCurrentPage < videoTotalPages) {
            videoCurrentPage++;
            updatePagination();
        }
    });

    // Initial render
    updatePagination();
});

