# 使用的nginx服务
FROM nginx
# 工作目录
WORKDIR /usr/share/nginx/html/
USER root

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist  /usr/share/nginx/html/

# 显示占用的端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
