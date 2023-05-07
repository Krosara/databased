FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /Requests.Service

COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /Requests.Service
COPY --from=build-env /App/out .
ENTRYPOINT [ "dotnet", "Requests.Service.dll" ]