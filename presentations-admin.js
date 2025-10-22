// Общие функции для работы с презентациями
const PresentationsManager = {
    // Ключ для localStorage
    storageKey: 'presentationData',

    // Стандартные презентации
    defaultPresentations: [
        {
            title: "1.1. Лексико-фонетический и орфографический материал",
            link: "https://docs.google.com/presentation/d/194KCziub_EiRfhPuxY5kH8_BhD1q1LIkQANjfwuDjO0/edit?usp=sharing",
            category: "training"
        },
        {
            title: "1.2. Лексико-грамматический материал",
            link: "https://docs.google.com/presentation/d/1A5EwSxFAGKSsgo7dYWSoHe-ZbU-6SkZOT0ZFruVmpVs/edit?usp=sharing",
            category: "training"
        },
        {
            title: "2.1. Компетенции специалиста. Моя профессия",
            link: "https://docs.google.com/presentation/d/1OQU2RxVl4OspxkfvKaxeLBr0m6VCcLBsebIoxuEqMOE/edit?usp=sharing",
            category: "product"
        }
    ],

    // Получить все презентации
    getAllPresentations: function() {
        const saved = localStorage.getItem(this.storageKey);
        const savedPresentations = saved ? JSON.parse(saved) : [];
        return savedPresentations.concat(this.defaultPresentations);
    },

    // Добавить новую презентацию
    addPresentation: function(presentation) {
        const presentations = this.getSavedPresentations();
        presentations.push(presentation);
        this.savePresentations(presentations);
    },

    // Обновить презентацию
    updatePresentation: function(index, updatedPresentation) {
        const presentations = this.getSavedPresentations();
        presentations[index] = updatedPresentation;
        this.savePresentations(presentations);
    },

    // Удалить презентацию
    deletePresentation: function(index) {
        const presentations = this.getSavedPresentations();
        presentations.splice(index, 1);
        this.savePresentations(presentations);
    },

    // Получить только сохраненные презентации (без стандартных)
    getSavedPresentations: function() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : [];
    },

    // Сохранить презентации
    savePresentations: function(presentations) {
        localStorage.setItem(this.storageKey, JSON.stringify(presentations));
    }
};

// Инициализация админ-панели
function initAdminPanel() {
    const form = document.getElementById('presentationForm');
    const presentationList = document.getElementById('presentationList');
    const presentationCount = document.getElementById('presentationCount');

    // Загрузить и отобразить презентации
    function loadPresentations() {
        const presentations = PresentationsManager.getSavedPresentations();
        renderPresentations(presentations);
    }

    // Отобразить список презентаций
    function renderPresentations(presentations) {
        presentationList.innerHTML = '';
        presentations.forEach((presentation, index) => {
            const item = document.createElement('div');
            item.className = 'preview-item';
            item.innerHTML = `
                <div class="preview-image">
                    <i class="fas fa-file-powerpoint" style="font-size: 32px;"></i>
                </div>
                <div class="preview-info">
                    <div class="preview-title">${presentation.title}</div>
                    <div class="preview-url">${presentation.link}</div>
                    <div class="preview-actions">
                        <button class="btn-outline edit-btn" data-index="${index}" style="padding: 6px 10px; font-size: 13px;">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-outline delete-btn" data-index="${index}" style="padding: 6px 10px; font-size: 13px;">
                            <i class="fas fa-trash"></i>
                        </button>
                        <a href="${presentation.link}" target="_blank" class="btn-outline" style="padding: 6px 10px; font-size: 13px; margin-left: auto; text-decoration: none;">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            `;
            presentationList.appendChild(item);
        });
        presentationCount.textContent = presentations.length;
    }

    // Обработчик формы
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('presentationTitle').value;
            const link = document.getElementById('presentationLink').value;
            const category = document.getElementById('presentationCategory').value;
            
            PresentationsManager.addPresentation({
                title: title,
                link: link,
                category: category,
                date: new Date().toLocaleDateString()
            });
            
            loadPresentations();
            form.reset();
            alert('Презентация успешно добавлена!');
        });
    }

    // Обработчики кнопок
    if (presentationList) {
        presentationList.addEventListener('click', function(e) {
            if (e.target.closest('.delete-btn')) {
                const index = e.target.closest('.delete-btn').dataset.index;
                if (confirm('Вы уверены, что хотите удалить эту презентацию?')) {
                    PresentationsManager.deletePresentation(index);
                    loadPresentations();
                }
            }
            
            if (e.target.closest('.edit-btn')) {
                const index = e.target.closest('.edit-btn').dataset.index;
                const presentations = PresentationsManager.getSavedPresentations();
                const presentation = presentations[index];
                
                document.getElementById('presentationTitle').value = presentation.title;
                document.getElementById('presentationLink').value = presentation.link;
                document.getElementById('presentationCategory').value = presentation.category;
                
                PresentationsManager.deletePresentation(index);
                loadPresentations();
            }
        });
    }

    // Инициализация
    if (presentationList) {
        loadPresentations();
    }
}

// Инициализация страницы презентаций
function initPresentationsPage() {
    const container = document.getElementById('presentationContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');

    // Отобразить презентации
    function displayPresentations(presentations) {
        if (presentations.length === 0) {
            container.innerHTML = `
                <div class="no-presentations">
                    <i class="far fa-file-powerpoint" style="font-size: 3rem; margin-bottom: 20px;"></i>
                    <h3>Презентации не найдены</h3>
                    <p>Добавьте презентации через админ-панель</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = presentations.map(presentation => `
            <div class="presentation-card" data-category="${presentation.category || 'other'}">
                <div class="presentation-icon">
                    <i class="far fa-file-powerpoint"></i>
                </div>
                <h3>${presentation.title}</h3>
                <a href="${presentation.link}" class="btn btn-primary btn-download" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Открыть
                </a>
            </div>
        `).join('');
    }

    // Инициализация
    if (container) {
        const allPresentations = PresentationsManager.getAllPresentations();
        displayPresentations(allPresentations);

        // Фильтрация по категориям
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.dataset.category;
                if (category === 'all') {
                    displayPresentations(allPresentations);
                } else {
                    const filtered = allPresentations.filter(p => p.category === category);
                    displayPresentations(filtered);
                }
            });
        });

        // Поиск
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const filtered = allPresentations.filter(p => 
                    p.title.toLowerCase().includes(searchTerm)
                );
                displayPresentations(filtered);
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
            });
        }
    }
}

// Автоматическое определение страницы и инициализация
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('presentationForm')) {
        // Это админ-панель
        initAdminPanel();
    } else if (document.getElementById('presentationContainer')) {
        // Это страница с презентациями
        initPresentationsPage();
    }
});