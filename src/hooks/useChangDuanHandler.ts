import { FormInstance, ElMessage } from "element-plus";
import { Ref } from "vue";
import { ChangDuanFromType } from "../data/data";
import { SEPARATOR } from "../data/XiquConstant";
import { getShowTime, addShowTime, getPastedContent, getLrc } from "./changDuanUtil";
import useClipboard from "vue-clipboard3";
import useWebSite from "../hooks/useWebSite";

const { toClipboard } = useClipboard();
const { getCurrentTime, setCurrentTime } = useWebSite();

export default (formData: Ref<ChangDuanFromType>, textareaEl: HTMLTextAreaElement, storageData: () => void) => {

    const handlePlay = () => {
        let time = getShowTime(formData.value.content, SEPARATOR, textareaEl);
        time && setCurrentTime(+time);
    };

    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        formEl.resetFields();
        storageData();
    };

    const handleAddTime = () => {
        formData.value.content = addShowTime(
            formData.value.content,
            textareaEl,
            getCurrentTime() + SEPARATOR
        );
    };

    const handlePaste = (event: ClipboardEvent) => {
        if (formData.value.content.trim() == "") {
            formData.value.content = getPastedContent(event);
            event.preventDefault();
        }
    };

    const handleCopy = async () => {
        try {
            await toClipboard(getLrc(formData.value));
            ElMessage({
                message: "已复制",
                type: "success",
            });
        } catch (e: any) {
            console.error(e);
            ElMessage.error("复制出错了, " + e.message);
        }
    };
    return {
        handleAddTime, handleCopy, handlePaste, handlePlay, resetForm
    }
}