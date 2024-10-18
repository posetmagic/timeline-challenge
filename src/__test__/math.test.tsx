// src/__tests__/math.test.tsx

import { clampAndRound } from '../utils/math';

describe('clampAndRound Utility Function', () => {

    test('should clamp and round value with step 10', () => {
        expect(clampAndRound(-1, 0, 50, 10)).toBeCloseTo(0, 5); // possible +0 or -0
        expect(clampAndRound(15, 10, 50, 10)).toBe(20); 
        expect(clampAndRound(-25, 0, 50, 20)).toBeCloseTo(0, 5); // possible +0 or -0
        expect(clampAndRound(49, 10, 50, 10)).toBe(50);
        expect(clampAndRound(51, 0, 50, 10)).toBe(50);
    });

    test('should clamp and round value with step 5', () => {
        expect(clampAndRound(12, 5, 20, 5)).toBe(10);
        expect(clampAndRound(22, 10, 20, 5)).toBe(20);
        expect(clampAndRound(-5, 5, 20, 5)).toBe(5);
        expect(clampAndRound(16, 5, 20, 5)).toBe(15);
        expect(clampAndRound(19, 10, 20, 5)).toBe(20);
    });

    test('should clamp and round value with step 7', () => {
        expect(clampAndRound(11, 7, 30, 7)).toBe(14);
        expect(clampAndRound(18, 0, 30, 7)).toBe(21);
        expect(clampAndRound(25, 14, 30, 7)).toBe(28);
        expect(clampAndRound(32, 0, 30, 7)).toBe(28);
        expect(clampAndRound(3, 7, 30, 7)).toBe(7);
    });


});
