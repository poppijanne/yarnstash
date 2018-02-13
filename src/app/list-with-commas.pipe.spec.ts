import { ListWithCommasPipe } from './list-with-commas.pipe';

describe('ListWithCommasPipe', () => {
  it('create an instance', () => {
    const pipe = new ListWithCommasPipe();
    expect(pipe).toBeTruthy();
  });
});
