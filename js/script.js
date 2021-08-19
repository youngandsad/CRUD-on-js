"use strict";
window.onload = function() {

    var mainMenu = $('.nav-mobile'), overlay = $('.overlay');

    $('.burger').on('click', function () {
        mainMenu.show().addClass('nav-mobile-show').animate({left: '0'}, 400);
        overlay.addClass('overlay-show');
    });

    overlay.on('click', function() {
        $(this).removeClass('overlay-show');
        mainMenu.animate({left: '-750'}, 400);
    })

    $('.close-menu').on('click', function() {
        overlay.removeClass('overlay-show');
        mainMenu.animate({left: '-750'}, 400);
    });


// блок с cookie

    $('.cookie-block').animate({
      bottom: 0
    }, 1000);

    $('.cookie-block .close').on('click', function () {
      $('.cookie-block').animate({
        bottom: -200
      }, 1000)
    });

// редактирование, удаление статей

var arArticlesData; // массив объектов

function getLocalStorage() {

        if(!localStorage.getItem('articles')) {

          arArticlesData = [
            {
                id: 0,
                articleImage: 'img/post1.png',
                textBeforeTitle: 'Nature',
                title: 'Tempor deserunt Sunt Qui',
                autor: 'Connie Robertson . November 3, 2012',
                mainText: 'Ea qui dolor aute cupidatat ad pariatur proident.Mollit nulla tempor aute reprehenderit ut dolore mollit nisi consequat excepteur ex officia pariatur irure'
            },
            {
                id: 1,
                articleImage: 'img/post2.png',
                textBeforeTitle: 'Plants',
                title: 'Tempor deserunt Sunt Qui',
                autor: 'Connie Robertson . November 3, 2012',
                mainText: 'Ea qui dolor aute cupidatat ad pariatur proident.Mollit nulla tempor aute reprehenderit ut dolore mollit nisi consequat excepteur ex officia pariatur irure'

            },
            {
                id: 2,
                articleImage: 'img/post3.png',
                textBeforeTitle: 'Food',
                title: 'Tempor deserunt Sunt Qui',
                autor: 'Connie Robertson . November 3, 2012',
                mainText: 'Ea qui dolor aute cupidatat ad pariatur proident.Mollit nulla tempor aute reprehenderit ut dolore mollit nisi consequat excepteur ex officia pariatur irure'

            },
            {
                id: 3,
                articleImage: 'img/post4.png',
                textBeforeTitle: 'Colorful',
                title: 'Tempor deserunt Sunt Qui',
                autor: 'Connie Robertson . November 3, 2012',
                mainText: 'Ea qui dolor aute cupidatat ad pariatur proident.Mollit nulla tempor aute reprehenderit ut dolore mollit nisi consequat excepteur ex officia pariatur irure'

            }
        ];

        localStorage.setItem('articles', JSON.stringify(arArticlesData));

      } else {
        arArticlesData = JSON.parse(localStorage.getItem('articles'))
      }
    }

var articleData;

function fnDrawArticles() {

    var arData = JSON.parse(localStorage.getItem('articles'));
    var articlesBlock = document.querySelector('.items-block');

    arData.forEach(function(article) {
             articleData = `<div class="item" id="${article.id}">
                <div class="item-content">
                    <div>
                        <img src="${article.articleImage}" class="image" alt="pic" />
                        <div class="change-buttons">
                            <button class="change-article">Изменить статью</button>
                            <button class="delete-article">Удалить статью</button>
                        </div>
                    </div>
                    <div class="item-text">
                        <div class="text">
                            <div>
                                <span class="before-title">${article.textBeforeTitle}</span>
                                <h2 class="article-title">${article.title}</h2>
                                <div class="autor">
                                    <span class="autor-name">${article.autor}</span>
                                </div>
                            </div>
                            <div class="article-main-text">${article.mainText}</div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>`;
            articlesBlock.innerHTML += articleData;
        });
      }

        getLocalStorage();
        fnDrawArticles();
      
        
        var aBtnsChange = document.querySelectorAll('.change-article');
        var popup = document.querySelector('.popup');
        var popupOverlay = document.querySelector('.popup-overlay');

        var imageUrl, beforeTitle, title, autor, mainText;
        var imgInput, beforeTitleInput, titleInput, autorInput, mainTextInput;

        var globalObj;
        var sArticleId;
        var sArticle;


        // добавление статей



        const addButton = document.querySelector('.add-article');

        const newArticlePopupOverlay = document.querySelector('.new-article-overlay');
        const newArticlePopup = document.querySelector('.new-article-popup');


        const newImageLink = newArticlePopup.querySelector('.image-link');
        const newIBeforeTitle = newArticlePopup.querySelector('.text-before-title');
        const newIArticleTitle = newArticlePopup.querySelector('.title');
        const newIAutor = newArticlePopup.querySelector('.autor');
        const newIMainText = newArticlePopup.querySelector('.main-text');


        addButton.onclick = function (e) {
          newArticlePopupOverlay.classList.add('new-article-overlay-show');
            newArticlePopup.classList.add('new-article-popup-show');
        };

        newArticlePopupOverlay.onclick = function () {
            this.classList.remove('new-article-overlay-show');
            this.parentNode.querySelector('.new-article-popup').classList.remove('new-article-popup-show');
        };

        const newArticleApply = newArticlePopup.querySelector('.apply');

        newArticleApply.onclick = function () {
          console.log(articleData)

        }


        const newArticleCancel = newArticlePopup.querySelector('.cancel');

        var arArticlesData = JSON.parse(localStorage.getItem('articles'));

        aBtnsChange.forEach(function (buttonChange) {
            buttonChange.onclick = function() {

                popup.classList.add('popup-show');
                popupOverlay.classList.add('popup-overlay-show');

                sArticle = buttonChange.closest(".item");
                sArticleId = sArticle.getAttribute('id');

                globalObj = arArticlesData.find(function(oArticleData) {
                    return oArticleData.id == sArticleId;
                });

                // получение данных статей
                imageUrl = sArticle.querySelector('.image').getAttribute('src');
                beforeTitle = sArticle.querySelector('.before-title').innerHTML;
                title = sArticle.querySelector('.article-title').innerHTML;
                autor = sArticle.querySelector('.autor-name').innerHTML;
                mainText = sArticle.querySelector('.article-main-text').innerHTML;

                // вставка данных в инпуты
                imgInput = popup.querySelector('.image-link');
                imgInput.value = imageUrl;

                beforeTitleInput = popup.querySelector('.text-before-title');
                beforeTitleInput.value = beforeTitle;

                titleInput = popup.querySelector('.title');
                titleInput.value = title;

                autorInput = popup.querySelector('.autor');
                autorInput.value = autor;

                mainTextInput = popup.querySelector('.main-text');
                mainTextInput.value = mainText;

            }

          });

          // префикс i - инпут

          var imageLink = popup.querySelector('.image-link');
          var iBeforeTitle = popup.querySelector('.text-before-title');
          var iArticleTitle = popup.querySelector('.title');
          var iAutor = popup.querySelector('.autor');
          var iMainText = popup.querySelector('.main-text');

          popup.querySelector('.apply').onclick = function() {

            if(sArticleId == globalObj.id) {
              sArticle.querySelector('.image').setAttribute('src', imageLink.value);
              sArticle.querySelector('.before-title').innerHTML = iBeforeTitle.value;
              sArticle.querySelector('.article-title').innerHTML = iArticleTitle.value;
              sArticle.querySelector('.autor-name').innerHTML = iAutor.value;
              sArticle.querySelector('.article-main-text').innerHTML = iMainText.value;
            }
            popup.classList.remove('popup-show');
            popupOverlay.classList.remove('popup-overlay-show')
          }

          popup.querySelector('.cancel').onclick = function () {
            popup.classList.remove('popup-show');
            popupOverlay.classList.remove('popup-overlay-show')
          }

          // закрытие popup при клике на подложку
          document.querySelector('.popup-overlay').onclick = function () {
            this.nextElementSibling.classList.remove('popup-show');
            this.classList.remove('popup-overlay-show');
          };

          // удаление статей


          // findIndex

          // splice

          var artItemsBlock = document.querySelector('.items-block');
          var arItem = artItemsBlock.querySelectorAll('.item');

          // перебрать массив со статьями, получить ID статьи
          // если id элемента массива равен id статьи, то удаляем элемент из массива

          for(let i = 0; i < arItem.length; i++) {

            let removeBtn = arItem[i].querySelector('.delete-article');
            let artId = Number(arItem[i].getAttribute('id'));

            arArticlesData.findIndex(function (element, index) {
              if(artId === index) {
                  removeBtn.onclick = function () {
                    arItem[i].remove();
                    arArticlesData.splice(index, 1)
                  }
              }
            });
          }
        };