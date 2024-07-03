# Use debian:12.2 as the base image
FROM debian:11.7

# Set environment variables for non-interactive (this prevents some prompts)
ENV DEBIAN_FRONTEND=noninteractive

RUN apt update

RUN apt install -y gnupg curl

RUN curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
   gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

RUN echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/debian bullseye/mongodb-org/7.0 main" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list

RUN apt update

ENV MONGODB_VERSION 7.0.0

RUN apt-get install -y mongodb-org=${MONGODB_VERSION}

ENV NODE_VERSION 18.18.2

# Install NVM
ENV NVM_DIR /usr/local/nvm

RUN mkdir -p $NVM_DIR

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
RUN . $NVM_DIR/nvm.sh && \
    nvm install ${NODE_VERSION} && \
    nvm alias default ${NODE_VERSION} && \
    nvm use default

# Add NVM binaries to path
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

WORKDIR /opt/app

# Start MongoDB when the container starts
CMD ["test/entrypoint.sh"]
