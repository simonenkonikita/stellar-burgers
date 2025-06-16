describe('Конструктор бургеров', () => {
  beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept(
      { method: 'GET', url: 'api/auth/user' },
      { fixture: 'user.json' }
    ).as('user');
    cy.intercept(
      { method: 'POST', url: 'api/orders' },
      { fixture: 'order.json' }
    ).as('order');
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Проверяем получения списка ингредентов', () => {
    cy.wait('@getIngredients');
    cy.wait('@user');
  });

  describe('Добавление одного ингредиента из списка ингредиентов в конструктор', () => {
    it('Добавление булки', () => {
      cy.get('[data-cy="ingredient-item"]')
        .first()
        .children()
        .find('button')
        .first()
        .click();
      cy.get('[data-cy="constructor-bun-top"]').should('exist');
      cy.get('[data-cy="constructor-bun-bottom"]').should('exist');
    });

    it('Добавление ингредиента', () => {
      cy.get('[data-cy="ingredient-item"]')
        .next()
        .next()
        .children()
        .first()
        .find('button')
        .click();
      cy.get('[data-cy="constructor-ingredients"]').should('exist');
    });

    it('Добавление соуса', () => {
      cy.get('[data-cy="ingredient-item"]')
        .last()
        .children()
        .last()
        .find('button')
        .click();
      cy.get('[data-cy="constructor-ingredients"]').should('exist');
    });
  });

  describe('Добавление всех игридиентов из списка ингредиентов в конструктор', () => {
    it('Добавление ингридиентов...', () => {
      /* Добавление булки */
      cy.get('[data-cy="ingredient-item"]')
        .first()
        .children()
        .find('button')
        .first()
        .click();

      /* Добавление основного ингридиента */
      cy.get('[data-cy="ingredient-item"]')
        .next()
        .next()
        .children()
        .first()
        .find('button')
        .click();

      /* Добавление соуса*/
      cy.get('[data-cy="ingredient-item"]')
        .last()
        .children()
        .last()
        .find('button')
        .click();

      cy.get('[data-cy="constructor-bun-top"]').should('exist');
      cy.get('[data-cy="constructor-ingredients"]').should('exist');
      cy.get('[data-cy="constructor-bun-bottom"]').should('exist');
      cy.get('[data-cy="constructor-ingredients"]').should('exist');
    });
  });

  describe('Тест модального окна', () => {
    it('Открытие модального окна', () => {
      cy.get('[data-cy="ingredient-item"]').first().children().first().click();
      cy.get('[data-cy="modal"]').should('be.visible');
    });

    it('Закрытие модального окна по крестику', () => {
      cy.get('[data-cy="ingredient-item"]').first().children().first().click();
      cy.get(`[data-cy='modal']`).find('button').click();
      cy.get(`[data-cy='modal']`).should('not.exist');
    });

    it('Закрытие модального окна по esc', () => {
      cy.get('[data-cy="ingredient-item"]').first().children().first().click();
      cy.get('body').type('{esc}');
      cy.get(`[data-cy='modal']`).should('not.exist');
    });

    it('Закрытие модального по оверлею', () => {
      cy.get('[data-cy="ingredient-item"]').first().children().first().click();
      cy.get(`[data-cy='modal-overlay']`).click('top', { force: true });
      cy.get(`[data-cy='modal']`).should('not.exist');
    });
  });

  describe('Тест создания заказа', () => {
    it('Создание заказа...', () => {
      /* Добавление булки */
      cy.get('[data-cy="ingredient-item"]')
        .first()
        .children()
        .find('button')
        .first()
        .click();

      /* Добавление основного ингридиента */
      cy.get('[data-cy="ingredient-item"]')
        .next()
        .next()
        .children()
        .first()
        .find('button')
        .click();

      /* Добавление соуса*/
      cy.get('[data-cy="ingredient-item"]')
        .last()
        .children()
        .last()
        .find('button')
        .click();

      cy.get('[data-cy="constructor-bun-top"]').should('exist');
      cy.get('[data-cy="constructor-ingredients"]').should('exist');
      cy.get('[data-cy="constructor-bun-bottom"]').should('exist');

      cy.get('[data-cy="constructor-burger"]')
        .last()
        .children()
        .last()
        .find('button')
        .click();

      cy.wait('@order');

      cy.get(`[data-cy="modal"]`).should('be.visible');

      cy.get('[data-cy="order-number"]').contains('81596');

      cy.get(`[data-cy='modal']`).find('button').click();

      cy.get('[data-cy="constructor-bun-top"]').should('not.exist');

      cy.get('[data-cy="constructor-ingredients"]')
        .contains('Выберите начинку')
        .should('exist');

      cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist');
    });
  });
});
