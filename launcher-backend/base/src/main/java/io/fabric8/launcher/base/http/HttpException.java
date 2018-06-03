package io.fabric8.launcher.base.http;

/**
 * @author <a href="mailto:ggastald@redhat.com">George Gastaldi</a>
 */
public class HttpException extends IllegalStateException {

    private final int statusCode;

    public HttpException(int statusCode, String message) {
        super(message);
        this.statusCode = statusCode;
    }

    public HttpException(String message, Throwable cause) {
        super(message, cause);
        this.statusCode = -1;
    }

    public int getStatusCode() {
        return statusCode;
    }
}

