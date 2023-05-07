FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /App

COPY ./Controllers ./
COPY ./Properties ./
COPY ./Services ./
COPY ./appsettings.sample.json ./appsettings.json
COPY ./Program.cs ./
COPY ./Requests.Service.csproj ./

RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /App
COPY --from=build-env /App/out .
ENTRYPOINT [ "dotnet", "Requests.Service.dll" ]