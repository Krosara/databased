using MassTransit;
using Databased.Shared.Models;

namespace Assets.Service.Consumers;

public class HeartBeatConsumer : IConsumer<HeartBeat>
{
    private readonly ILogger<HeartBeatConsumer> _logger;

    public HeartBeatConsumer(ILogger<HeartBeatConsumer> logger)
    {
        _logger = logger;
    }

    public Task Consume(ConsumeContext<HeartBeat> context)
    {
        _logger.LogInformation("Received heartbeat with ID {Id} and timestamp {Timestamp}", context.Message.Identifier, context.Message.Timestamp);
        return Task.CompletedTask;
    }
}