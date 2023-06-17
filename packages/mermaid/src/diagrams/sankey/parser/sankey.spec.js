import diagram from './sankey.jison';
import { parser } from './sankey.jison';
import db from '../sankeyDB.js';
// import { fail } from 'assert';

describe('Sankey diagram', function () {
  // TODO - these examples should be put into ./parser/stateDiagram.spec.js
  describe('when parsing an info graph it', function () {
    beforeEach(function () {
      parser.yy = db;
      diagram.parser.yy = db;
      diagram.parser.yy.clear();
    });

    it('recognizes its type', () => {
      const str = `sankey`;

      parser.parse(str);
    });

    it('recognizes one flow', () => {
      const str = `
      sankey
      a -> 30 -> b -> 20 -> c
      `;

      parser.parse(str);
    });

    it('recognizes multiple flows', () => {
      const str = `
      sankey
      a -> 30 -> b -> 12 -> e
      c -> 30 -> d -> 12 -> e
      c -> 40 -> e -> 12 -> q
      `;

      parser.parse(str);
    });

    describe('while attributes parsing', () => {
      it('parses different quotless variations', () => {
        const str = `
        sankey
        node[]
        node[attr=1]
        a -> 30 -> b
        node[attrWithoutValue]
        node[attr = 3]
        node[attr1 = 23413 attr2=1234]
        node[x1dfqowie attr1 = 23413 attr2]
        `;

        parser.parse(str);
      });

      it('parses strings as values', () => {
        const str = `
        sankey
        node[attr="hello, how are you?"]
        node[attr="hello\\"afaasd"]
        `;

        parser.parse(str);
      });
    });
  });
});