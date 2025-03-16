import { type Either, Left, Right } from '@/core/exceptions/Either';
import { describe, expect, it } from 'vitest';

type JsonPrimitive = string | number | boolean | null | undefined;
type JsonObject = { [key: string]: JsonValue };
type JsonValue = JsonPrimitive | JsonValue[] | JsonObject;

const evaluate = (value: JsonValue): Either<Error, JsonValue> => {
  if (typeof value === 'object' && value !== null) {
    if (Array.isArray(value) && value.length === 0) {
      return Left.create(new Error('Empty Array'));
    }

    if (Object.values(value).length === 0) {
      return Left.create(new Error('Empty Object'));
    }
  }

  if (!value) return Left.create(new Error('Value Is Falsy'));
  return Right.create(value);
};

describe('Either', () => {
  it('should returns left error', () => {
    const result = evaluate({});
    const error = new Error('Empty Object');

    expect(result.isLeft()).toBe(true);
    expect((result as Left<Error>).error).toEqual(error);
  });

  it('should returns right value', () => {
    const obj = { message: 'Hi!' };
    const result = evaluate(obj);

    expect(result.isRight()).toBe(true);
    expect((result as Right<JsonValue>).value).toEqual(obj);
  });
});
