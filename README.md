# Chess Square Guess

A game to help visualize the chess board.

## Run locally

To run locally run the following:

```bash
npm run dev
```

## Deploy locally

```bash
aws s3 sync ../dist/ s3://$(terraform output --raw s3_bucket_name) --delete
aws cloudfront create-invalidation --distribution-id $(terraform output --raw distribution_id) --paths "/*"
```