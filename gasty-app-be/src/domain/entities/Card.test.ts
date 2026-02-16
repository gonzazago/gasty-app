import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('should create a valid card', () => {
    const card = new Card(
      '1',
      'bank-1',
      'Test Card',
      'visa',
      '1234',
      '#FFFFFF',
      'black'
    );
    expect(card.isValid()).toBe(true);
  });

  it('should be invalid if bankId is empty', () => {
    const card = new Card(
      '1',
      '',
      'Test Card',
      'visa',
      '1234',
      '#FFFFFF',
      'black'
    );
    expect(card.isValid()).toBe(false);
  });

  it('should be invalid if name is empty', () => {
    const card = new Card(
      '1',
      'bank-1',
      '',
      'visa',
      '1234',
      '#FFFFFF',
      'black'
    );
    expect(card.isValid()).toBe(false);
  });

  it('should correctly assign type, color and style', () => {
    const card = new Card(
      '1',
      'bank-1',
      'Test Card',
      'mastercard',
      '5678',
      '#000000',
      'gold'
    );
    expect(card.type).toBe('mastercard');
    expect(card.color).toBe('#000000');
    expect(card.style).toBe('gold');
  });
});
