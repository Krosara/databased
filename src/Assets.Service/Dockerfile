FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /App

COPY ./Consumers ./
COPY ./Controllers ./
COPY ./Properties ./
COPY ./Services ./
COPY ./appsettings.json ./
COPY ./Program.cs ./
COPY ./Assets.Service.csproj ./

RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /App
COPY --from=build-env /App/out .
ENTRYPOINT [ "dotnet", "Assets.Service.dll" ]