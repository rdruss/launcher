import * as React from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter } from '@patternfly/react-core';
import MainLayoutContainer from '../layout/MainLayoutContainer';
import './FrontPage.css';
import { CaretRightIcon } from '@patternfly/react-icons';

export default function FrontPage() {
    return (
        <MainLayoutContainer>
            <section id="intro">
                <div className="container">
                    <h1>launch</h1>
                    <h2>Continuous application delivery,</h2>
                    <h2>built and deployed on OpenShift.</h2>
                    <Button className="launch" component="a" href="/wizard">Launch your Project</Button>
                </div>
            </section>
            <section id="runtimes">
                <div className="container">
                    <h1>Supported Runtimes</h1>
                </div>
                <div className="container">
                    <Card className="card">
                        <CardHeader className="thorntail"/>
                        <CardBody>
                            Thorntail offers an innovative approach to packaging and running
                            Java EE applications by packaging them with just enough of the server
                            runtime to "java -jar" your application.
                        </CardBody>
                        <CardFooter>
                            <a href="https://thorntail.io" target="_blank">
                                Learn more <CaretRightIcon/>
                            </a>
                        </CardFooter>
                    </Card>
                    <Card className="card">
                        <CardHeader className="vertx"/>
                        <CardBody>
                            Eclipse Vert.x is a tool-kit for building reactive applications on the JVM.
                        </CardBody>
                        <CardFooter>
                            <a href="https://projects.eclipse.org/projects/rt.vertx" target="_blank">
                                Learn more <CaretRightIcon/>
                            </a>
                        </CardFooter>
                    </Card>
                    <Card className="card">
                        <CardHeader className="spring">Spring Boot</CardHeader>
                        <CardBody>
                            Spring Boot makes it easy to create stand-alone,
                            production-grade Spring based Applications that you can "just run".
                        </CardBody>
                        <CardFooter>
                            <a href="http://spring.io/projects/spring-boot" target="_blank">
                                Learn more <CaretRightIcon/>
                            </a>
                        </CardFooter>
                    </Card>
                </div>
                <div className="container row2">
                    <Card className="card">
                        <CardHeader className="fuse"/>
                        <CardBody>
                            Red Hat® Fuse is a lightweight, flexible integration platform that uses Apache Camel at his core.
                        </CardBody>
                        <CardFooter>
                            <a href="https://developers.redhat.com/products/fuse/overview/" target="_blank">
                                Learn more <CaretRightIcon/>
                            </a>
                        </CardFooter>
                    </Card>
                    <Card className="card">
                        <CardHeader className="node"/>
                        <CardBody>
                            Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
                            Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
                        </CardBody>
                        <CardFooter>
                            <a href="https://nodejs.org/" target="_blank">
                                Learn more <CaretRightIcon/>
                            </a>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        </MainLayoutContainer>
    );
}