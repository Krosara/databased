api_gateway="./src/Api.Gateway/Api.Gateway.csproj"
assets_service="./src/Assets.Service/Assets.Service.csproj"
# assets_service="/src/Assets.Service/Assets.Service.csproj"

dotnet run --project $api_gateway &
dotnet run --project $assets_service

wait