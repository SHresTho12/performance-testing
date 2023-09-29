# performance-testing

## Start Grafana , Loki and influxdb

```bash
docker-compose -p logs -f docker-compose-log.yaml up
```

## Start the load test

Test Files are kept in the `k6/tests` directory

## Run tests

```bash
TEST=circle docker-compose -p k6 up --force-recreate --build k6
```

## For linux if the requests fails add this in the `docker-compose` file for the `k6` service instead of `network-mode: host`

```bash
--add-host=host.docker.internal:host-gateway
```

And the change the `locathost` to `host.docker.internal` in the `k6` test file

Also the --out flag link in the compose file of k6 to

```bash
command: run --out influxdb=http://host.docker.internal:8086/k6 --env SCENARIOS=$SCENARIOS /app/tests/$TEST.test.js
```
