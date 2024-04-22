// Устанавливаем библиотеку axios для отправки HTTP-запросов
import * as css from "./style.css";
const axios = require('axios');

// Функция для поиска вакансий на сайте hh.ru
async function searchVacancies(searchQuery) {
  try {
    // Отправляем запрос на поиск вакансий по указанному запросу
    const response = await axios.get(`https://api.hh.ru/vacancies`, {
      params: {
        text: searchQuery, // Текст запроса
        area: 1, // Регион (Москва)
        per_page: 10 // Количество результатов на странице
      }
    });

    // Возвращаем результаты поиска
    return response.data.items;
  } catch (error) {
    console.error(error);
  }
}

// Функция для отображения результатов поиска
function displayVacancies(vacancies) {
  const vacanciesList = document.getElementById('vacancies-list');

  // Очищаем список вакансий
  vacanciesList.innerHTML = '';

  // Если вакансий не найдено, отображаем сообщение
  if (vacancies.length === 0) {
    vacanciesList.innerHTML = '<li>Вакансий не найдено</li>';
    return;
  }

  // Отображаем список вакансий
  vacancies.forEach(vacancy => {
    const listItem = document.createElement('li');
    listItem.textContent = `${vacancy.name} (${vacancy.employer.name})`;
    vacanciesList.appendChild(listItem);
  });
}

// Обработчик события отправки формы поиска
document.getElementById('search-form').addEventListener('submit', async event => {
  event.preventDefault(); // Отменяем стандартное поведение формы

  // Получаем текст запроса из поля поиска
  const searchQuery = document.getElementById('search-query').value;

  // Ищем вакансии по указанному запросу
  const vacancies = await searchVacancies(searchQuery);

  // Отображаем результаты поиска
  displayVacancies(vacancies);
});
