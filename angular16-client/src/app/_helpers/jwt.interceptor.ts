import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

import { environment } from '@environments/environment';
import { AuthService } from '@app/_services';

export function jwtInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
    // add auth header with jwt if user is logged in and request is to the api url
    const authService = inject(AuthService);
    const isLoggedIn = authService.authValue
    const isApiUrl = request.url.startsWith(environment.apiUrl2);
    console.log(isLoggedIn);
    if (isLoggedIn && isApiUrl) {
        console.log("Add Authorization");
        request = request.clone({
            setHeaders: { Authorization: `${isLoggedIn?.data?.accessToken}` }
        });
    }

    return next(request);
}
