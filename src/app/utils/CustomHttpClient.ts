import { DefaultHttpClient, HttpRequest, HttpResponse } from "@microsoft/signalr";
import { AuthService } from "../services/auth.service";

export class CustomHttpClient extends DefaultHttpClient {
    constructor(
        private authService: AuthService
    ) {
        super(console);
    }

    public override send(request: HttpRequest): Promise<HttpResponse> {
      request.headers = { ...request.headers, 'Authorization': `Bearer ${this.authService.user?.token}` };
      return super.send(request);
    }
}