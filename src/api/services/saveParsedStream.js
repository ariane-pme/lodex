export default async function saveParsedStream(ctx) {
    const publishedCount = await ctx.publishedDataset.count();
    if (publishedCount === 0) {
        await ctx.dataset.remove({});
        await ctx.saveStream(ctx.parsedStream);
        await ctx.field.initializeModel();

        return ctx.dataset.count();
    }
    try {
        await ctx.dataset.updateMany(
            {},
            { $set: { lodex_published: true } },
            { multi: true },
        );
        await ctx.uriDataset.updateMany(
            {},
            { $set: { lodex_published: true } },
            { multi: true },
        );
        await ctx.publishedDataset.updateMany(
            {},
            { $set: { lodex_published: true } },
            { multi: true },
        );
        await ctx.saveStream(ctx.parsedStream);

        const fields = await ctx.field.findAll();
        const collectionCoverFields = fields.filter(
            c => c.cover === 'collection',
        );

        const count = await ctx.dataset.count({
            lodex_published: { $exists: false },
        });

        await ctx.publishDocuments(ctx, count, collectionCoverFields);
        await ctx.publishFacets(ctx, fields);

        return ctx.dataset.count();
    } catch (error) {
        await ctx.dataset.remove({ lodex_published: { $exists: false } });
        await ctx.uriDataset.remove({ lodex_published: { $exists: false } });
        await ctx.publishedDataset.remove({
            lodex_published: { $exists: false },
        });

        throw error;
    }
}
