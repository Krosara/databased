api_gateway="./src/Api.Gateway/Api.Gateway.csproj"
assets_service="./src/Assets.Service/Assets.Service.csproj"
# assets_service="/src/Assets.Service/Assets.Service.csproj"

dotnet run -p $api_gateway &
dotnet run -p $assets_service

wait