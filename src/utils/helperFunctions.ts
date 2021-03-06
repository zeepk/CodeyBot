export const isDev = () => process.env.NODE_ENV === 'development';

export const isNullUndefinedOrWhitespace = (
    text: string | null | undefined
) => {
    if (text === null || text === undefined) {
        return true;
    }
    return text.trim() === '';
};

export const getChannelId: (channel: string) => string = channel =>
    channel.slice(-18);
