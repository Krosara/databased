
using Databased.Shared.Models;
using MassTransit;


namespace Requests.Service;

public class HeartBeatSender : BackgroundService
{
    private readonly IBus messageBus;
    private readonly ILogger<HeartBeatSender> logger;

    public HeartBeatSender(IBus messageBus, ILogger<HeartBeatSender> logger)
    {
        this.messageBus = messageBus;
        this.logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        while (cancellationToken.IsCancellationRequested == false)
        {

            var heartBeat = new HeartBeat();
            await messageBus.Publish(new HeartBeat(), cancellationToken);
            this.logger.LogInformation("Sent heartbeat {Timestamp}", heartBeat.Timestamp);
            await Task.Delay(TimeSpan.FromSeconds(1800), cancellationToken);

        }
    }

}
