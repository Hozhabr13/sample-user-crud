export function paginate(data: any[], page: number, limit: number) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = data.slice(startIndex, endIndex);
  return {
    page,
    limit,
    totalPages: Math.ceil(data.length / limit),
    results,
  };
}
