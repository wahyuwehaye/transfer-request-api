const { formatDate } = require('../../src/utils/dateHelpers');

describe('Date Helpers', () => {
    it('should format a date correctly', () => {
        const date = new Date('2023-08-24');
        const formattedDate = formatDate(date);
        
        expect(formattedDate).toBe('24/08/2023');  // Depending on your formatDate function
    });

    // ... more tests
});
