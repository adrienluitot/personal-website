all=true
while [ -n "$1" ]; do
    case "$1" in
        -m)
            all=false
            updateMain=true
            ;;
        -p)
            all=false
            updateProjects=true
            ;;
        -a)
            all=true
            break
            ;;
        *)
            echo -e "Usage: $0 [options]\n"
            echo "Options:"
            echo -e "\t-h: Display this message"
            echo -e "\t-m: Update main page translation"
            echo -e "\t-p: Update projects translation"
            echo -e "\t-a: Update evrything"
            exit
            ;;
    esac
    shift
done

if [ "$all" = true ] || [ "$updateMain" = true ]; then
    echo "[Debug] Translate main page"
    static-i18n -l en -i en -i fr --localesPath locales --allowHtml --exclude projects --outputDir site html_templates
fi

if [ "$all" = true ] || [ "$updateProjects" = true ]; then
    echo "[Debug] Translate projects"
    static-i18n -l en -i en -i fr --localesPath locales --allowHtml --exclude index.html --fixPaths false --outputDir site html_templates
fi
