api_gateway="./src/Api.Gateway/Api.Gateway.csproj"
assets_service="./src/Assets.Service/Assets.Service.csproj"
requests_service="./src/Requests.Service/Requests.Service.csproj"

dotnet watch run --project $api_gateway &
dotnet watch run --project $assets_service &
dotnet watch run --project $requests_service

wait