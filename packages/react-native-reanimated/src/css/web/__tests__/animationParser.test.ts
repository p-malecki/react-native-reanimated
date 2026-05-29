'use strict';
import { processKeyframeDefinitions } from '../animationParser';

describe('processKeyframeDefinitions (web)', () => {
  test('serializes from/to keyframe selectors and their block styles', () => {
    expect(
      processKeyframeDefinitions({ from: { opacity: 0 }, to: { opacity: 1 } })
    ).toBe('from { opacity: 0 } to { opacity: 1 }');
  });

  test('converts integer selectors to percentages', () => {
    expect(
      processKeyframeDefinitions({ 0: { opacity: 0 }, 1: { opacity: 1 } })
    ).toBe('0% { opacity: 0 } 100% { opacity: 1 }');
  });

  test('converts a fractional selector to a percentage', () => {
    expect(processKeyframeDefinitions({ 0.5: { opacity: 0.3 } })).toBe(
      '50% { opacity: 0.3 }'
    );
  });

  test('prepends a per-keyframe animationTimingFunction to the block', () => {
    expect(
      processKeyframeDefinitions({
        from: { opacity: 0, animationTimingFunction: 'ease-in' },
        to: { opacity: 1 },
      })
    ).toBe(
      'from { animation-timing-function: ease-in; opacity: 0 } to { opacity: 1 }'
    );
  });
});
