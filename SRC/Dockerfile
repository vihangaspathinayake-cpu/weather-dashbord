# 1. ආරම්භය (Base Image)
FROM node:18-alpine

# 2. වැඩ කරන තැන (Working Directory)
WORKDIR /app

# 3. 'back end' ෆෝල්ඩර් එකේ තියෙන package files කොපි කිරීම
# (ඔයාගේ folder නමේ space එකක් තියෙන නිසා මේ විදිහටම ලියන්න)
COPY ["back end/package*.json", "./"]

# 4. Libraries ඉන්ස්ටෝල් කිරීම
RUN npm install

# 5. ඉතිරි සියලුම files (index.html, scripts etc.) කොපි කිරීම
COPY . .

# 6. Port එක (ඔයාගේ server එක run වෙන port එක)
EXPOSE 3000

# 7. ඇප් එක පණ ගැන්වීම
CMD ["node", "back end/server.js"]