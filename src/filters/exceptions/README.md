## 内置HTTP异常

为了减少样板代码，Nest 提供了一系列继承自核心异常 HttpException 的可用异常。所有这些都可以在 @nestjs/common包中找到：

    BadRequestException
    UnauthorizedException
    NotFoundException
    ForbiddenException
    NotAcceptableException
    RequestTimeoutException
    ConflictException
    GoneException
    PayloadTooLargeException
    UnsupportedMediaTypeException
    UnprocessableException
    InternalServerErrorException
    NotImplementedException
    BadGatewayException
    ServiceUnavailableException
    GatewayTimeoutException