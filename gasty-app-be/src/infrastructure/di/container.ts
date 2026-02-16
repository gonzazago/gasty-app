import { IExpenseRepository } from '@domain/repositories/IExpenseRepository';
import { IBankRepository } from '@domain/repositories/IBankRepository';
import { ICardRepository } from '@domain/repositories/ICardRepository';
import { MongoExpenseRepository } from '@adapters/persistence/mongodb/MongoExpenseRepository';
import { MongoBankRepository } from '@adapters/persistence/mongodb/MongoBankRepository';
import { MongoCardRepository } from '@adapters/persistence/mongodb/MongoCardRepository';

import { ExpenseController } from '@adapters/http/controllers/ExpenseController';
import { BankController } from '@adapters/http/controllers/BankController';
import { CardController } from '@adapters/http/controllers/CardController';
import {
    CreateBankUseCase, CreateCardUseCase,
    CreateExpenseUseCase, GetBanksUseCase, GetCardByIdUseCase, GetCardsByBankIdUseCase, GetCardsUseCase,
    GetExpenseByIdUseCase,
    GetExpensesUseCase
} from "@application/use-cases";

/**
 * Contenedor de inyección de dependencias
 * Aquí se configuran todas las dependencias de la aplicación
 * siguiendo el principio de inversión de dependencias
 */
export class Container {
  // Repositorios (adaptadores secundarios)
  private _expenseRepository: IExpenseRepository;
  private _bankRepository: IBankRepository;
  private _cardRepository: ICardRepository;

  // Casos de uso
  private _createExpenseUseCase: CreateExpenseUseCase;
  private _getExpensesUseCase: GetExpensesUseCase;
  private _getExpenseByIdUseCase: GetExpenseByIdUseCase;
  private _createBankUseCase: CreateBankUseCase;
  private _getBanksUseCase: GetBanksUseCase;
  private _createCardUseCase: CreateCardUseCase;
  private _getCardsUseCase: GetCardsUseCase;
  private _getCardByIdUseCase: GetCardByIdUseCase;
  private _getCardsByBankIdUseCase: GetCardsByBankIdUseCase;

  // Controladores (adaptadores primarios)
  private _expenseController: ExpenseController;
  private _bankController: BankController;
  private _cardController: CardController;

  constructor() {
    // Inicializar repositorios (usando MongoDB)
    this._expenseRepository = new MongoExpenseRepository();
    this._bankRepository = new MongoBankRepository();
    this._cardRepository = new MongoCardRepository();

    // Inicializar casos de uso
    this._createExpenseUseCase = new CreateExpenseUseCase(this._expenseRepository);
    this._getExpensesUseCase = new GetExpensesUseCase(this._expenseRepository);
    this._getExpenseByIdUseCase = new GetExpenseByIdUseCase(this._expenseRepository);
    this._createBankUseCase = new CreateBankUseCase(this._bankRepository);
    this._getBanksUseCase = new GetBanksUseCase(this._bankRepository);
    this._createCardUseCase = new CreateCardUseCase(this._cardRepository);
    this._getCardsUseCase = new GetCardsUseCase(this._cardRepository);
    this._getCardByIdUseCase = new GetCardByIdUseCase(this._cardRepository);
    this._getCardsByBankIdUseCase = new GetCardsByBankIdUseCase(this._cardRepository);

    // Inicializar controladores
    this._expenseController = new ExpenseController(
      this._createExpenseUseCase,
      this._getExpensesUseCase,
      this._getExpenseByIdUseCase
    );
    this._bankController = new BankController(
      this._createBankUseCase,
      this._getBanksUseCase
    );
    this._cardController = new CardController(
      this._createCardUseCase,
      this._getCardsUseCase,
      this._getCardByIdUseCase,
      this._getCardsByBankIdUseCase
    );
  }

  // Getters para acceder a las dependencias
  get expenseController(): ExpenseController {
    return this._expenseController;
  }

  get bankController(): BankController {
    return this._bankController;
  }

  get cardController(): CardController {
    return this._cardController;
  }
}

