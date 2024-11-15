import $ from "../core";

// •	Метод отправляет GET-запрос по указанному url и в зависимости от параметра dataTypeAnswer возвращает ответ в формате JSON, текст или бинарные данные.
// •	Используется fetch, и при неудачном запросе выбрасывается ошибка.

$.prototype.get = async function (url, dataTypeAnswer = "json") {
  let res = await fetch(url); // Отправка GET-запроса по указанному URL

  if (!res.ok) {
    // Если запрос не удался, выбрасываем ошибку
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  switch (
    dataTypeAnswer // Обработка типа ответа
  ) {
    case "json":
      return await res.json(); // Преобразуем ответ в JSON
    case "text":
      return await res.text(); // Преобразуем ответ в текст
    case "blob":
      return await res.blob(); // Преобразуем ответ в бинарные данные (Blob)
  }
};

// •	Метод отправляет POST-запрос с данными (data) на сервер.
// •	Также, как и в методе get, тип возвращаемого ответа зависит от параметра dataTypeAnswer.

$.prototype.post = async function (url, data, dataTypeAnswer = "text") {
  let res = await fetch(url, {
    method: "POST", // Метод POST
    body: data, // Данные, которые отправляются на сервер
  });

  switch (
    dataTypeAnswer // Обработка типа ответа
  ) {
    case "json":
      return await res.json(); // Преобразуем ответ в JSON
    case "text":
      return await res.text(); // Преобразуем ответ в текст
    case "blob":
      return await res.blob(); // Преобразуем ответ в бинарные данные (Blob)
  }
};

//  --------- Пример использования:

// // Получение данных в формате JSON
// $.get('https://api.example.com/data').then(data => console.log(data));

// // Отправка данных на сервер
// $.post('https://api.example.com/data', JSON.stringify({ name: 'John' }), 'json')
//   .then(response => console.log(response));
