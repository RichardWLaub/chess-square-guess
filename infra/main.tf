module "app_infra" {
  source = "github.com/RichardWLaub/tf-modules//s3-cf-r53?ref=main"

  bucket_name    = "chess-squares-bucket-rl"
  certificate_id = "f6fc951f-7dea-490c-847e-b85fe81fc7ba"
  domain_name    = "randommode.click"
  subdomain      = "chesssquares"
}

output "s3_bucket_name" {
  description = "The name of the S3 bucket used for the app"
  value       = module.app_infra.s3_bucket_name
}

output "distribution_id" {
  description = "The CloudFront distribution ID"
  value       = module.app_infra.distribution_id
}

output "a_record" {
  description = "The Route 53 A record for the app"
  value       = module.app_infra.a_record
}

output "distribution_url" {
  description = "The CloudFront distribution domain name (URL)"
  value       = module.app_infra.distribution_url
}

