/**
 * Utility functions for chart data processing and formatting
 */
import type { Habit } from '@/lib/types';

/**
 * Generates color palette for charts
 * @param count Number of colors needed
 * @returns Array of color hex codes
 */
export function generateChartColors(count: number): string[] {
  const baseColors = [
    '#4f46e5', // primary
    '#f97316', // orange
    '#10b981', // green
    '#ec4899', // pink
    '#f59e0b', // amber
    '#06b6d4', // cyan
    '#8b5cf6', // violet
    '#ef4444', // red
  ];
  
  // If we need more colors than in our base palette, generate additional ones
  if (count <= baseColors.length) {
    return baseColors.slice(0, count);
  }
  
  // Generate additional colors by adjusting lightness
  const result = [...baseColors];
  const neededExtra = count - baseColors.length;
  
  for (let i = 0; i < neededExtra; i++) {
    const baseIndex = i % baseColors.length;
    // This is a simplistic approach - in a real app, you might use a color library
    // to properly generate variations with HSL adjustments
    result.push(lightenColor(baseColors[baseIndex], 20));
  }
  
  return result;
}

/**
 * Lightens a hex color by the specified amount
 * @param hex Hex color code
 * @param amount Amount to lighten (0-100)
 * @returns Lightened hex color
 */
function lightenColor(hex: string, amount: number): string {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  
  // Lighten
  r = Math.min(255, r + amount);
  g = Math.min(255, g + amount);
  b = Math.min(255, b + amount);
  
  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Formats a date for display in charts
 * @param dateString ISO date string
 * @param format Format type ('short', 'medium', 'long')
 * @returns Formatted date string
 */
export function formatChartDate(dateString: string, format: 'short' | 'medium' | 'long' = 'medium'): string {
  const date = new Date(dateString);
  
  switch (format) {
    case 'short':
      return `${date.getMonth() + 1}/${date.getDate()}`;
    case 'medium':
      return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
    case 'long':
      return date.toLocaleDateString();
    default:
      return dateString;
  }
}

/**
 * Calculates completion rate data for the past n days
 * @param habits List of habits
 * @param days Number of days to include
 * @returns Array of data points with date and completion rate
 */
export function calculateCompletionRateData(habits: Habit[], days: number = 7) {
  const result = [];
  const today = new Date();
  
  // Generate data for each of the past n days
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    // Count habits that existed on this date
    const activeHabits = habits.filter(habit => {
      const createdDate = new Date(habit.createdAt);
      return createdDate <= date && !habit.archived;
    });
    
    // Count completions for this date
    const completedCount = activeHabits.filter(habit => 
      habit.completedDates.includes(dateString)
    ).length;
    
    // Calculate completion rate
    const completionRate = activeHabits.length > 0 
      ? Math.round((completedCount / activeHabits.length) * 100) 
      : 0;
    
    result.push({
      date: dateString,
      formattedDate: formatChartDate(dateString, 'short'),
      completionRate
    });
  }
  
  return result;
}

/**
 * Calculates category distribution data
 * @param habits List of habits
 * @returns Array of data points with category and count
 */
export function calculateCategoryDistribution(habits: Habit[]) {
  const categoryMap: Record<string, number> = {};
  
  // Count habits in each category
  habits.forEach(habit => {
    if (!habit.archived) {
      const category = habit.category || 'uncategorized';
      categoryMap[category] = (categoryMap[category] || 0) + 1;
    }
  });
  
  // Convert to array format for charts
  return Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value
  }));
}
