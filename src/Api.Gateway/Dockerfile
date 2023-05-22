FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /App

COPY ./Properties ./
COPY ./Program.cs ./
COPY ./Api.Gateway.csproj ./
COPY ./ocelot.json ./

RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /App
COPY --from=build-env /App/out .

EXPOSE 9000

ENTRYPOINT [ "dotnet", "Api.Gateway.dll" ]