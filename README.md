# humrroworksample
## JWT Support
- JWT tokens are now generated using the `jjwt` library.
- Tokens are signed and verified in `JWTUtil.java`
- Spring Security parses and authenticates tokens via `JWTAuthenticationFilter`

