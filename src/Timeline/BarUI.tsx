// BarUI.tsx

export const BarUI = () => {
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1); // Example: numbers 1-10
  
    return (
      <div className="flex justify-between px-4 bg-gray-700 text-white">
        {numbers.map((num) => (
          <div key={num} className="text-sm">
            {num}
          </div>
        ))}
      </div>
    );
  };
