export function formatCompactINR(amount: number) {
  if (amount >= 1_00_00_000) {
    return `₹${(amount / 1_00_00_000).toFixed(2)} Cr`
  }

  if (amount >= 1_00_000) {
    return `₹${(amount / 1_00_000).toFixed(2)} L`
  }

  return `₹${new Intl.NumberFormat('en-IN').format(amount)}`
}

export function formatCompactNumber(amount: number) {
  if (amount >= 1_00_00_000) {
    return `${(amount / 1_00_00_000).toFixed(2)} Cr`
  }

  if (amount >= 1_00_000) {
    return `${(amount / 1_00_000).toFixed(2)} L`
  }

  return new Intl.NumberFormat('en-IN').format(amount)
}