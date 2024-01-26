export function GeneratePaginationMeta(
    totalDocuments: number,
    page: number,
    limit: number,
) {
    return {
        page,
        limit,
        total: totalDocuments,
        totalPages: Math.ceil(
            totalDocuments / limit < 1 ? 1 : totalDocuments / limit,
        ),
    }
}
