package io.fabric8.launcher.service.git;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.function.Predicate;
import java.util.regex.Pattern;

import com.fasterxml.jackson.databind.ObjectMapper;

import static io.fabric8.launcher.service.git.api.GitService.GIT_FULLNAME_REGEXP;
import static io.fabric8.launcher.service.git.api.GitService.GIT_NAME_REGEXP;
import static java.util.Objects.requireNonNull;

/**
 * Helper class for Git
 */
public final class Gits {

    private static final ObjectMapper MAPPER = new ObjectMapper();



    private static final Predicate<String> GIT_FULLNAME_PREDICATE = Pattern.compile(GIT_FULLNAME_REGEXP).asPredicate();



    private static final Predicate<String> GIT_NAME_PREDICATE = Pattern.compile(GIT_NAME_REGEXP).asPredicate();

    private Gits() {
        throw new IllegalAccessError();
    }

    /**
     * Encode a param in order to add it to an URL
     *
     * @param param the param to encode
     * @return the encoded param
     */
    public static String encode(final String param) {
        try {
            return URLEncoder.encode(param, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new IllegalStateException(e);
        }
    }

    /**
     * Tell whether the given name is a valid git repository name or not (<owner>/<repo>)
     *
     * @param name the git repository name to check
     * @return true if it is a valid git repository name
     */
    public static boolean isValidGitRepositoryName(final String name) {
        return GIT_NAME_PREDICATE.test(name);
    }

    /**
     * Check whether the given name is a valid git repository name or not.
     *
     * @param name the git repository name to check
     * @return the given name if it is valid
     * @throws IllegalArgumentException if this is not a valid git repository name
     * @throws NullPointerException     if this name is null
     */
    public static String checkGitRepositoryNameArgument(final String name) {
        requireNonNull(name, "name must not be null.");
        if (!isValidGitRepositoryName(name)) {
            throw new IllegalArgumentException(String.format("The given name is not a valid git repository name: %s.", name));
        }
        return name;
    }

    /**
     * Tell whether the given name is a valid git repository full name or not (<owner>/<repo>)
     *
     * @param fullName the git repository full name to check
     * @return true if it is a valid git repository full name
     */
    public static boolean isValidGitRepositoryFullName(final String fullName) {
        return GIT_FULLNAME_PREDICATE.test(fullName);
    }

    /**
     * Check whether the given name is a valid git repository full name or not (<owner>/<repo>).
     *
     * @param fullName the git repository full name to check
     * @return the given name if it is valid
     * @throws IllegalArgumentException if this is not a valid git repository full name
     * @throws NullPointerException     if this fullName is null
     */
    public static String checkGitRepositoryFullNameArgument(final String fullName) {
        requireNonNull(fullName, "fullName must not be null.");
        if (!isValidGitRepositoryFullName(fullName)) {
            throw new IllegalArgumentException(String.format("The given name is not a valid git repository full name: %s.", fullName));
        }
        return fullName;
    }

    public static String createGitRepositoryFullName(final String owner, final String name) {
        return String.format("%s/%s", owner, name);
    }

}
